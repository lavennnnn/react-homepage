import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';

export interface Heading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  headings: Heading[];
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ headings }) => {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const [activeId, setActiveId] = useState<string>('');
  const activeRef = React.useRef<HTMLAnchorElement | null>(null);
  const currentH1IdRef = React.useRef<string>('');
  const isManualScrollRef = React.useRef<boolean>(false);

  // 初始化时展开所有一级标题
  useEffect(() => {
    const h1Ids = headings.filter(h => h.level === 1).map(h => h.id);
    setExpandedSections(new Set(h1Ids));
    // 初始化第一个一级标题的引用
    if (h1Ids.length > 0 && !currentH1IdRef.current) {
      currentH1IdRef.current = h1Ids[0];
    }
  }, [headings]);

  // 监听滚动，高亮当前标题
  useEffect(() => {
    if (headings.length === 0) return;

    let rafId: number | null = null;
    let lastActiveId = '';

    const handleScroll = () => {
      const scrollOffset = 100; // 导航栏高度 + 一些偏移
      const viewportTop = window.scrollY + scrollOffset;
      const viewportBottom = window.scrollY + window.innerHeight;

      // 找到当前应该高亮的标题
      let currentActive = '';
      let bestMatch: { id: string; distance: number } | null = null;

      // 遍历所有标题，找到最适合的标题
      for (let i = 0; i < headings.length; i++) {
        const element = document.getElementById(headings[i].id);
        if (!element) continue;

        const rect = element.getBoundingClientRect();
        const elementTop = rect.top + window.scrollY;
        const elementBottom = elementTop + rect.height;

        // 如果标题在视口中
        if (elementTop <= viewportBottom && elementBottom >= viewportTop) {
          // 计算标题顶部到视口顶部的距离
          const distance = Math.abs(elementTop - viewportTop);
          
          if (!bestMatch || distance < bestMatch.distance) {
            bestMatch = { id: headings[i].id, distance };
            currentActive = headings[i].id;
          }
        }
      }

      // 如果没有标题在视口中，找到最接近视口顶部的标题
      if (!currentActive) {
        let closestDistance = Infinity;
        for (let i = 0; i < headings.length; i++) {
          const element = document.getElementById(headings[i].id);
          if (!element) continue;

          const rect = element.getBoundingClientRect();
          const elementTop = rect.top + window.scrollY;
          const distance = Math.abs(elementTop - viewportTop);

          if (distance < closestDistance) {
            closestDistance = distance;
            currentActive = headings[i].id;
          }
        }
      }

      // 如果找到了新的活动标题，更新状态
      if (currentActive && currentActive !== lastActiveId) {
        lastActiveId = currentActive;
        setActiveId(currentActive);
        
        // 如果正在手动滚动，只更新高亮，不执行展开/收起逻辑
        if (isManualScrollRef.current) {
          return;
        }
        
        // 自动展开包含当前活动标题的父级标题，并收起其他一级标题
        const activeIndex = headings.findIndex(h => h.id === currentActive);
        if (activeIndex !== -1) {
          // 找到当前活动标题所属的一级标题
          let currentH1Index = -1;
          let currentH1Id = '';
          for (let i = activeIndex; i >= 0; i--) {
            if (headings[i].level === 1) {
              currentH1Index = i;
              currentH1Id = headings[i].id;
              break;
            }
          }
          
          // 检查一级标题是否改变
          const h1Changed = currentH1Id && currentH1Id !== currentH1IdRef.current;
          
          // 如果一级标题改变了，更新记录
          if (h1Changed && currentH1Id) {
            currentH1IdRef.current = currentH1Id;
          }
          
          setExpandedSections(prev => {
            // 如果一级标题改变了，创建新的 Set（收起其他一级标题），否则更新现有的 Set
            const newExpanded = h1Changed ? new Set() : new Set(prev);
            
            // 只展开当前一级标题及其子标题
            if (currentH1Index !== -1 && currentH1Id) {
              // 展开当前一级标题
              newExpanded.add(headings[currentH1Index].id);
              
              // 找到下一个一级标题的索引（用于确定当前一级标题的范围）
              let nextH1Index = headings.length;
              for (let i = currentH1Index + 1; i < headings.length; i++) {
                if (headings[i].level === 1) {
                  nextH1Index = i;
                  break;
                }
              }
              
              // 如果一级标题改变了，展开所有二级标题；否则只展开必要的父级标题
              if (h1Changed) {
                // 展开当前一级标题下的所有二级标题（level === 2）
                for (let i = currentH1Index + 1; i < nextH1Index; i++) {
                  if (headings[i].level === 2) {
                    newExpanded.add(headings[i].id);
                  }
                }
              }
              
              // 展开当前活动标题的所有父级标题（确保能看到当前活动标题）
              // 从当前活动标题向上查找，直到找到一级标题
              for (let i = activeIndex - 1; i > currentH1Index; i--) {
                if (headings[i].level < headings[activeIndex].level) {
                  newExpanded.add(headings[i].id);
                }
              }
            } else {
              // 如果没有找到一级标题，保持原有逻辑
              for (let i = activeIndex - 1; i >= 0; i--) {
                if (headings[i].level < headings[activeIndex].level) {
                  newExpanded.add(headings[i].id);
                } else if (headings[i].level >= headings[activeIndex].level) {
                  break;
                }
              }
            }
            
            return newExpanded;
          });
        }
      }
    };

    // 使用 requestAnimationFrame 实现流畅的滚动检测
    const onScroll = () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
      rafId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    handleScroll(); // 初始调用

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [headings]);

  // 当活动项改变时，滚动到该位置
  useEffect(() => {
    if (activeId && activeRef.current) {
      // 延迟一下，确保 DOM 已更新
      setTimeout(() => {
        const container = activeRef.current?.closest('.sticky');
        if (container && activeRef.current) {
          const containerRect = container.getBoundingClientRect();
          const activeRect = activeRef.current.getBoundingClientRect();
          
          // 如果活动项不在视口中，滚动到它
          if (activeRect.top < containerRect.top || activeRect.bottom > containerRect.bottom) {
            activeRef.current.scrollIntoView({
              behavior: 'smooth',
              block: 'center',
            });
          }
        }
      }, 100);
    }
  }, [activeId]);

  const toggleSection = (id: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedSections(newExpanded);
  };

  const handleClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      // 标记为手动滚动，禁用自动展开/收起逻辑
      isManualScrollRef.current = true;
      
      const offset = 100; // 导航栏高度
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      // 监听滚动结束，恢复自动展开/收起逻辑
      let scrollEndTimer: NodeJS.Timeout;
      const onScrollEnd = () => {
        clearTimeout(scrollEndTimer);
        scrollEndTimer = setTimeout(() => {
          isManualScrollRef.current = false;
          window.removeEventListener('scroll', onScrollEnd);
          // 滚动结束后，强制触发一次检查，确保能正确收起其他一级标题
          // 通过触发一个微小的滚动来触发 handleScroll
          const currentScrollY = window.scrollY;
          if (currentScrollY > 0) {
            // 触发一次滚动检测
            window.dispatchEvent(new Event('scroll'));
          }
        }, 200);
      };
      
      window.addEventListener('scroll', onScrollEnd, { passive: true });
      // 如果滚动很快完成，也设置一个最大延迟
      setTimeout(() => {
        if (isManualScrollRef.current) {
          isManualScrollRef.current = false;
          window.removeEventListener('scroll', onScrollEnd);
          // 强制触发一次检查
          window.dispatchEvent(new Event('scroll'));
        }
      }, 1000);
    }
  };

  // 判断一个标题是否有子标题
  const hasChildren = (index: number): boolean => {
    if (index >= headings.length - 1) return false;
    return headings[index + 1].level > headings[index].level;
  };

  // 获取一个标题的所有直接子标题
  const getChildren = (index: number): number[] => {
    const children: number[] = [];
    const currentLevel = headings[index].level;
    
    for (let i = index + 1; i < headings.length; i++) {
      const nextLevel = headings[i].level;
      // 如果遇到同级或更高级的标题，说明已经超出当前标题的范围
      if (nextLevel <= currentLevel) break;
      // 只添加直接子级（下一级）
      if (nextLevel === currentLevel + 1) {
        children.push(i);
      }
    }
    
    return children;
  };

  const renderHeading = (index: number, depth: number = 0): React.ReactNode => {
    const heading = headings[index];
    const children = getChildren(index);
    const hasChild = children.length > 0;
    const isExpanded = expandedSections.has(heading.id);
    const isActive = activeId === heading.id;

    const indentClass = depth === 0 ? '' : depth === 1 ? 'ml-4' : 'ml-8';

    return (
      <div key={heading.id} className={indentClass}>
        <div className="flex items-center group">
          {hasChild && (
            <button
              onClick={() => toggleSection(heading.id)}
              className="mr-1 p-0.5 hover:bg-white/5 rounded transition-colors flex-shrink-0"
              aria-label={isExpanded ? '折叠' : '展开'}
            >
              {isExpanded ? (
                <ChevronDown size={14} className="text-gray-500" />
              ) : (
                <ChevronRight size={14} className="text-gray-500" />
              )}
            </button>
          )}
          {!hasChild && <div className="w-5 flex-shrink-0" />}
          <a
            ref={isActive ? activeRef : null}
            href={`#${heading.id}`}
            onClick={(e) => handleClick(e, heading.id)}
            className={`flex-1 py-1.5 px-2 rounded text-sm truncate relative transition-all duration-150 ease-out ${
              isActive
                ? 'text-purple-400 bg-purple-500/20 font-semibold'
                : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
            }`}
            title={heading.text}
          >
            {heading.text}
          </a>
        </div>
        {isExpanded && hasChild && (
          <div className="mt-1 space-y-1">
            {children.map((childIndex) => renderHeading(childIndex, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  if (headings.length === 0) {
    return null;
  }

  // 找到所有一级标题
  const topLevelHeadings = headings
    .map((h, idx) => ({ heading: h, index: idx }))
    .filter(({ heading }) => heading.level === 1);

  return (
    <div className="sticky top-24 h-[calc(100vh-8rem)] overflow-y-auto">
      <div className="bg-[#19191c] border border-white/10 rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-white">目录</h3>
          <button
            onClick={() => {
              const h1Ids = new Set(headings.filter(h => h.level === 1).map(h => h.id));
              if (expandedSections.size === h1Ids.size) {
                setExpandedSections(new Set());
              } else {
                setExpandedSections(new Set(h1Ids));
              }
            }}
            className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
          >
            {expandedSections.size === headings.filter(h => h.level === 1).length ? '全部折叠' : '全部展开'}
          </button>
        </div>
        <nav className="space-y-1">
          {topLevelHeadings.map(({ index }) => renderHeading(index))}
        </nav>
      </div>
    </div>
  );
};

export default TableOfContents;


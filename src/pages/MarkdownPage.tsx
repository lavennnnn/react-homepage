import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import rehypeSlug from 'rehype-slug';
import TableOfContents, { Heading } from '../components/TableOfContents';

const MarkdownPage: React.FC = () => {
  const { filename } = useParams<{ filename: string }>();
  const [markdownContent, setMarkdownContent] = useState<string>('');
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!filename) {
      setError('Invalid filename');
      setLoading(false);
      return;
    }

    // Ensure filename has .md extension
    const formattedFilename = filename.endsWith('.md') ? filename : `${filename}.md`;

    const fetchMarkdown = async () => {
        try {
          // 使用绝对路径确保在Vercel环境中能正确访问
          const url = `/posts/${formattedFilename}`;
          console.log(`Fetching: ${url}`);
          
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`Failed to load markdown file: ${response.status} ${response.statusText}`);
          }
          const content = await response.text();
          console.log('Markdown content loaded:', content.length, 'characters');
          setMarkdownContent(content);
        } catch (err) {
          console.error('Error fetching markdown:', err);
          // 提供更详细的错误信息
          setError(err instanceof Error ? `${err.message} - 请检查文件路径是否正确` : 'An error occurred');
        } finally {
          setLoading(false);
        }
      };

      fetchMarkdown();
  }, [filename]);

  // 从 DOM 中提取标题（确保 ID 与 rehype-slug 一致）
  useEffect(() => {
    if (!contentRef.current || !markdownContent) return;

    const extractHeadingsFromDOM = () => {
      const headingElements = contentRef.current?.querySelectorAll('h1, h2, h3');
      if (!headingElements) return;

      const extracted: Heading[] = [];
      headingElements.forEach((element) => {
        const id = element.id;
        const text = element.textContent || '';
        const level = parseInt(element.tagName.charAt(1));

        if (id && text && level <= 3) {
          extracted.push({ id, text, level });
        }
      });

      setHeadings(extracted);
    };

    // 延迟提取，确保 DOM 已渲染
    const timer = setTimeout(extractHeadingsFromDOM, 100);
    return () => clearTimeout(timer);
  }, [markdownContent]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1e1e1e] flex items-center justify-center">
        <div className="text-[#858585]">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#1e1e1e] flex items-center justify-center">
        <div className="text-[#f48771]">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1e1e1e] text-[#d4d4d4]">
      {/* Navbar is now provided by HomeLayout */}
      
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-16">
        <div className="flex gap-8">
          {/* 主内容区域 */}
          <div className="flex-1 max-w-5xl mx-auto">
            <div 
              ref={contentRef}
              className="bg-[#252526] p-10 md:p-16 rounded-lg shadow-xl prose prose-invert max-w-none"
              style={{
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                fontSize: '16px',
                lineHeight: '1.8',
                color: '#d4d4d4'
              }}
            >
              <ReactMarkdown
                rehypePlugins={[rehypeSlug]}
                components={{
                  h1({ children, ...props }) {
                    return (
                      <h1 
                        className="text-3xl font-bold mt-12 mb-6 text-[#ffffff] first:mt-0 border-b-0 pb-0" 
                        style={{ fontWeight: 600, letterSpacing: '-0.02em' }}
                        {...props}
                      >
                        {children}
                      </h1>
                    );
                  },
                  h2({ children, ...props }) {
                    return (
                      <h2 
                        className="text-2xl font-semibold mt-10 mb-5 text-[#ffffff] border-b-0 pb-0" 
                        style={{ fontWeight: 600, letterSpacing: '-0.01em' }}
                        {...props}
                      >
                        {children}
                      </h2>
                    );
                  },
                  h3({ children, ...props }) {
                    return (
                      <h3 
                        className="text-xl font-semibold mt-8 mb-4 text-[#e8e8e8]" 
                        style={{ fontWeight: 600 }}
                        {...props}
                      >
                        {children}
                      </h3>
                    );
                  },
                  h4({ children, ...props }) {
                    return (
                      <h4 
                        className="text-lg font-semibold mt-6 mb-3 text-[#e0e0e0]" 
                        style={{ fontWeight: 600 }}
                        {...props}
                      >
                        {children}
                      </h4>
                    );
                  },
                  p({ children, ...props }) {
                    return (
                      <p 
                        className="mb-6 text-[#d4d4d4]" 
                        style={{ lineHeight: '1.8', fontSize: '16px' }}
                        {...props}
                      >
                        {children}
                      </p>
                    );
                  },
                  ul({ children, ...props }) {
                    return (
                      <ul 
                        className="list-disc list-outside mb-6 text-[#d4d4d4] space-y-1.5" 
                        style={{ paddingLeft: '1.8em', lineHeight: '1.8' }}
                        {...props}
                      >
                        {children}
                      </ul>
                    );
                  },
                  ol({ children, ...props }) {
                    return (
                      <ol 
                        className="list-decimal list-outside mb-6 text-[#d4d4d4] space-y-1.5" 
                        style={{ paddingLeft: '1.8em', lineHeight: '1.8' }}
                        {...props}
                      >
                        {children}
                      </ol>
                    );
                  },
                  li({ children, ...props }) {
                    return (
                      <li 
                        className="text-[#d4d4d4]" 
                        style={{ lineHeight: '1.8', fontSize: '16px', marginBottom: '0.5em' }}
                        {...props}
                      >
                        {children}
                      </li>
                    );
                  },
                  blockquote({ children, ...props }) {
                    return (
                      <blockquote 
                        className="border-l-4 border-[#858585] pl-5 my-6 italic text-[#b4b4b4] bg-[#2d2d30] py-3 rounded-r" 
                        style={{ lineHeight: '1.8' }}
                        {...props}
                      >
                        {children}
                      </blockquote>
                    );
                  },
                  code({ className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || '');
                    return match ? (
                      <SyntaxHighlighter
                        style={atomDark}
                        language={match[1]}
                        PreTag="div"
                        className="rounded-md my-6 overflow-x-auto"
                        customStyle={{
                          padding: '16px',
                          fontSize: '14px',
                          lineHeight: '1.6',
                          borderRadius: '6px',
                          backgroundColor: '#1e1e1e',
                          border: '1px solid #3e3e42'
                        }}
                        {...props as any}
                      >
                        {String(children).replace(/\n$/, '')}
                      </SyntaxHighlighter>
                    ) : (
                      <code 
                        className="bg-[#1e1e1e] text-[#d7ba7d] px-1.5 py-0.5 rounded text-[15px] font-mono border border-[#3e3e42]" 
                        style={{ fontFamily: 'Consolas, "Courier New", monospace' }}
                        {...props}
                      >
                        {children}
                      </code>
                    );
                  },
                  pre({ children, ...props }) {
                    return (
                      <pre className="my-6" {...props}>
                        {children}
                      </pre>
                    );
                  },
                  a({ children, href, ...props }) {
                    return (
                      <a 
                        href={href}
                        className="text-[#4ec9b0] hover:text-[#6ec9b0] underline underline-offset-2 transition-colors" 
                        style={{ textDecorationColor: 'rgba(78, 201, 176, 0.4)' }}
                        {...props}
                      >
                        {children}
                      </a>
                    );
                  },
                  strong({ children, ...props }) {
                    return (
                      <strong className="font-semibold text-[#ffffff]" {...props}>
                        {children}
                      </strong>
                    );
                  },
                  em({ children, ...props }) {
                    return (
                      <em className="italic text-[#d4d4d4]" {...props}>
                        {children}
                      </em>
                    );
                  },
                  hr({ ...props }) {
                    return (
                      <hr className="my-10 border-[#3e3e42]" style={{ borderTopWidth: '1px' }} {...props} />
                    );
                  },
                  table({ ...props }) {
                    return (
                      <div className="overflow-x-auto my-8">
                        <table 
                          className="min-w-full border-collapse" 
                          style={{ border: '1px solid #3e3e42' }}
                          {...props} 
                        />
                      </div>
                    );
                  },
                  thead({ ...props }) {
                    return (
                      <thead className="bg-[#2d2d30]" {...props} />
                    );
                  },
                  tbody({ ...props }) {
                    return (
                      <tbody className="bg-[#252526]" {...props} />
                    );
                  },
                  th({ children, ...props }) {
                    return (
                      <th 
                        className="border border-[#3e3e42] px-4 py-3 text-left font-semibold text-[#ffffff]" 
                        style={{ backgroundColor: '#2d2d30' }}
                        {...props}
                      >
                        {children}
                      </th>
                    );
                  },
                  td({ children, ...props }) {
                    return (
                      <td 
                        className="border border-[#3e3e42] px-4 py-3 text-[#d4d4d4]" 
                        style={{ lineHeight: '1.8' }}
                        {...props}
                      >
                        {children}
                      </td>
                    );
                  },
                  img({ src, alt, ...props }) {
                    return (
                      <img 
                        src={src}
                        alt={alt}
                        className="my-8 rounded-md max-w-full h-auto shadow-xl"
                        style={{ 
                          display: 'block',
                          marginLeft: 'auto',
                          marginRight: 'auto',
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
                        }}
                        {...props}
                      />
                    );
                  },
                }}
              >
                {markdownContent}
              </ReactMarkdown>
            </div>
          </div>

          {/* 目录侧边栏 */}
          {headings.length > 0 && (
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <TableOfContents headings={headings} />
            </aside>
          )}
        </div>
      </div>
    </div>
  );
};

export default MarkdownPage;

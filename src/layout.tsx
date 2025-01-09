import Footer from './components/footer';
import Header from './components/header';

export default function Layout({
  children,
  className,
  showHeader = true,
  showFooter = true,
}: {
  children: React.ReactNode;
  className?: string;
  showHeader?: boolean;
  showFooter?: boolean;
}) {
  return (
    <div className={`page ${className ? className : ''}`}>
      {showHeader && <Header />}
      {children}
      {showFooter && <Footer />}
    </div>
  );
}

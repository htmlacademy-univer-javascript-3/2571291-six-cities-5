import Footer from './components/footer';
import Header from './components/header';

export default function Layout({
  children,
  className,
  customHeader,
  showFooter = true,
}: {
  children: React.ReactNode;
  className?: string;
  customHeader?: React.ReactNode;
  showFooter?: boolean;
}) {
  return (
    <div className={`page ${className ? className : ''}`}>
      {customHeader === undefined ? <Header /> : customHeader}
      {children}
      {showFooter && <Footer />}
    </div>
  );
}

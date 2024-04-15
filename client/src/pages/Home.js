import Header from '../comp/Header';
import Footer from '../comp/Footer';
import MainContent from '../comp/MainContent';
import StoreId from '../comp/StoreId';

const Home = () => {
  return (
    <>
      <Header />
      <StoreId />
      <MainContent pageName="home Page" />

      <Footer />
    </>
  );
};

export default Home;

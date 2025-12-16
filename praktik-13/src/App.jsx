import Identity from './components/Identity';
import ProductApp from './ProductApp';
import './App.css';

function App() {
  return (
    <>
      <Identity />
      <div className="portfolio-wrapper">
        <ProductApp />
      </div>
    </>
  );
}

export default App;

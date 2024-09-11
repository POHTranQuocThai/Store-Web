import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { routes } from './routes';
import DefaultComponent from './components/DefaultComponent/DefaultComponent';
import { Fragment } from 'react';
import axios from 'axios'
import { useQuery } from '@tanstack/react-query';

function App() {

  // const fetchApi = async () => {
  //   const res = await axios.get(`${process.env.API_KEY}/products/getAll`)
  //   return res.data
  // }
  // const query = useQuery({ queryKey: ['todos'], queryFn: fetchApi })
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {routes.map((route) => {
            const Page = route.page;
            const Layout = route.isShowHeader ? DefaultComponent : Fragment
            return (
              <Route path={route.path} element={
                <Layout>
                  <Page />
                </Layout>
              } />
            )
          })}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
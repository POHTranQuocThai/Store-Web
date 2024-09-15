import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { routes } from './routes'
import DefaultComponent from './components/DefaultComponent/DefaultComponent'
import { Fragment, useEffect } from 'react'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { isJsonString } from './utils/utils'
import { jwtDecode } from 'jwt-decode'
import { updateUser } from './redux/slice/userSlide'
import * as UserSevice from './services/UserService'
import { useDispatch } from 'react-redux'

function App() {
  const dispatch = useDispatch()
  // const fetchApi = async () => {
  //   const res = await axios.get(`${process.env.API_KEY}/products/getAll`)
  //   return res.data
  // }
  // const query = useQuery({ queryKey: ['todos'], queryFn: fetchApi })
  useEffect(() => {
    const { decoded, storageData } = handleDecoded()

    if (decoded?.id) {
      handleGetDetailUser(decoded?.id, storageData)
    }
  }, [])
  const handleDecoded = () => {
    let storageData = localStorage.getItem('access_token');
    console.log('Storage Data:', storageData);  // Thêm dòng này để kiểm tra token trong localStorage
    let decoded = {};
    if (storageData && isJsonString(storageData)) {
      storageData = JSON.parse(storageData);
      decoded = jwtDecode(storageData);
    }
    console.log('Decoded:', decoded);  // Thêm dòng này để kiểm tra dữ liệu giải mã
    return { decoded, storageData };
  };
  // Add a request interceptor
  UserSevice.axiosJWT.interceptors.request.use(async function (config) {
    const currentTime = new Date()
    const { decoded } = handleDecoded();

    if (decoded?.exp < currentTime.getTime() / 1000) {
      const data = await UserSevice.refreshToken()
      console.log('data', data);

      config.headers['token'] = `Bearer ${data?.access_token}`
    }

    return config;
  }, function (error) {
    return Promise.reject(error);
  });


  const handleGetDetailUser = async (id, token) => {
    try {
      const res = await UserSevice.getDetailUser(id, token);
      dispatch(updateUser({ ...res?.data, access_token: token }));
    } catch (error) {
    }
  };
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
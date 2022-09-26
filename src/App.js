import logo from './logo.svg';
import { RiArrowRightSLine, RiArrowLeftSLine, RiAlarmWarningFill, RiKakaoTalkFill, RiTimeFill, RiMenuFill } from 'react-icons/ri';
import { MdDarkMode, MdLightMode } from 'react-icons/md';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import './App.css';
import { useEffect, useState } from 'react';
import { Routes, Route, useSearchParams, useNavigate } from 'react-router-dom';
import SubwayPage from './page/SubwayPage';
import { darkTheme, lightTheme } from './static/color';

function App() {
  const [menuActive, setMenuActive] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [theme, setTheme] = useState(lightTheme);
  const [lang, setLang] = useState('kor');

  let navigate = useNavigate();

  useEffect(() => {}, []);

  return (
    <div className='App' style={{ backgroundColor: theme.bg1, minHeight: '100vh' }}>
      <Routes>
        <Route path='/subway' element={<SubwayPage lang={lang} theme={theme} />}></Route>
        <Route path='/lost-item' element={<div>lost-item</div>}></Route>
      </Routes>

      <div
        style={{
          position: 'fixed',
          bottom: 30,
          right: 30,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 999,
          width: menuActive ? '80vw' : '50px',
          height: '50px',
          borderRadius: '50px',
          boxShadow: '0px 0px 20px -5px #888888',
          transition: 'width ease 0.4s',
        }}
        onClick={() => setMenuActive(!menuActive)}
      >
        {menuActive ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000000', gap: 20, overflow: 'hidden' }}>
            <div
              onClick={() => {
                navigate('/subway');
              }}
            >
              지하철 정보
            </div>
            <div>역 정보</div>
            <div
              onClick={() => {
                navigate('/lost-item');
              }}
            >
              분실물 조회
            </div>
          </div>
        ) : (
          <RiMenuFill style={{ color: '#000000', fontSize: '20px' }} />
        )}
      </div>

      <div
        style={{
          position: 'fixed',
          top: 20,
          right: 30,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 999,
          height: '50px',
        }}
      >
        <IconButton size='large' style={{ color: theme.text1 }} onClick={() => setTheme(theme === darkTheme ? lightTheme : darkTheme)}>
          {theme === darkTheme ? <MdLightMode /> : <MdDarkMode />}
        </IconButton>

        <Button size='large' style={{ color: theme.text1 }} onClick={() => setLang(lang === 'kor' ? 'eng' : 'kor')}>
          {lang === 'kor' ? 'ENG' : 'KOR'}
        </Button>
      </div>
    </div>
  );
}

export default App;

import { RiArrowRightSLine, RiArrowLeftSLine, RiAlarmWarningFill, RiKakaoTalkFill, RiTimeFill } from 'react-icons/ri';
import { useEffect, useState } from 'react';
import {  useSearchParams } from 'react-router-dom';
import { axiosInstance } from '../axiosInstance';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import RefreshIcon from '@mui/icons-material/Refresh';
import React from "react";
import { ToastNotification } from '../ToastNotification';




function SubwayPage({ theme, lang }) {
  
  let [toastState, setToastState] = useState(false);
  
  let [timeState, setTimeState] = useState(true);
  
  
  const [searchParams, setSearchParams] = useSearchParams();
  const [modalOpen, setModalOpen] = useState(false);
  const [trainfo,setTrainfo]=useState([]);
  const [nexinfo,setNexinfo]=useState([]);
  const colors=["#0d3692","#33a23d","#fe5d10","#00a2d1","#8b50a4","#c55c1d","#54640d","#f14c82","#aa9872"];
  let asd=searchParams.get('subwayNm');//subwayNm으로 체크할거임 
  const linecolor=colors[asd.replace('호선','')-1]//subwayNm으로 체크할거임 get.replace~~
  const style = {
    color: theme.gray1,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    bgcolor: theme.bg1,
    border: '2px solid ',
    bordercolor:theme.gray1,
    boxShadow: 24,
    p: 4,
    borderRadius: '20px',
  };
  const shareKakao = () => {
    window.Kakao.Share.sendCustom({
      templateId: 85076, 
      templateArgs:{
        title: trainfo.statnNm,
        state: trainfo.trainSttus,
      },
    });
  };
  const Nextreceive=()=>{// 도착 예정시간 받아오는거 
  axiosInstance.get(`/subway/arrival?updnLine=${setTrainfo.updnLine}&subwayNm=${searchParams.get('subwayNm')}&statnNm=${setTrainfo.statnNm}`)
  .then((res) => {
    setNexinfo(res.data.data)
  });
    
}
  const Inforeceive=()=>{
    console.log(searchParams.get('trainNo'));
  axiosInstance.get(`/subway?trainNo=${searchParams.get('trainNo')}&subwayNm=${searchParams.get('subwayNm')}`)
  .then((res) => {
    setTrainfo(res.data.data)
    console.log(trainfo.nextStatns.stationNameList)
  });
    
}//호선 정보 받는거

/* const Inforeceive=()=>{
    console.log(searchParams.get('trainNo'));
  axiosInstance.get(`/subway?trainNo=${searchParams.get('trainNo')}&subwayNm=${searchParams.get('subwayNm')}`)
  .then((res) => {
    setTrainfo(res.data)
    
    console.log(res.data.data)
  });
    
}
let timer=setInterval(()=>{  
  Inforeceive() 
  setTimeState(timeState===true?false:true)
  console.log("5ses")
},5000);//5초마다 자동갱신 */



  return (
    <div style={{ width: '100vw', padding: '100px 0px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{color:theme.gray1}}>{
          {
            kor:((new Date()).toLocaleString('ko-KR')),
            eng:(new Date()).toLocaleString('en-US'),
          }[lang]
        
        }
        <RefreshIcon onClick={()=>{
           Inforeceive()
           setTimeState(timeState===true?false:true)
           console.log('click')
        }
         
          }/></div>
        <div style={{ height: '10px' }} />
        

        <div style={{ fontSize: '20px', fontWeight: '500', color: theme.gray1 }}>
          {
            {
              kor: '현재 탑승 중이신 열차는',
              eng: 'This train is',
            }[lang]
          }
        </div>

        <div style={{ height: '30px' }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div
            style={{
              color: '#ffffff',
              backgroundColor: linecolor,
              padding: '5px 10px',
              borderRadius: '20px',
              fontSize: '15px',
              fontWeight: 600,
            }}//trainfo.statnTnm
          >
            {searchParams.get('subwayNm')} -{trainfo.statnTnm}행 
          </div> 

          <div
            style={{
              color: '#ffffff',
              backgroundColor: '#ff4444',
              padding: '5px 10px',
              borderRadius: '20px',
              fontSize: '15px',
              fontWeight: 600,
            }}//{trainfo.direcctAt===1?<p>급행열차</p>:<p>일반열차</p>}
          >
            {trainfo.direcctAt===1?<p>급행열차</p>:<p>일반열차</p>}
          </div>
         
        </div>

        <div style={{ height: '40px' }} />

        <div style={{ display: 'flex', alignItems: 'start', flexDirection: 'column', gap: 7 }}>
          <div style={{ fontSize: '15px', fontWeight: '400', color: '#aaaaaa' }}>{trainfo.prevStatns?.stationNameList[0].kor}
          </div>
          <div style={{ fontSize: '15px', fontWeight: '400', color: '#aaaaaa' }}>{trainfo.prevStatns?.stationNameList[1].kor}</div>
          <div style={{ position: 'relative', margin: '-7px 0' }}>
            <div style={{ position: 'absolute', fontSize: '40px', bottom: 13, left: -60, opacity: '20%', color:theme.gray1 }}>
              <RiArrowLeftSLine />
            </div>

            <div style={{ fontSize: '70px', fontWeight: '700', letterSpacing: 3,color:theme.gray1 }}>{trainfo.statnNm}</div>
            <div style={{ position: 'absolute', fontSize: '40px', bottom: 13, right: -60 ,color:theme.gray1}}>
              <RiArrowRightSLine />
            </div>
            <div style={{ position: 'absolute', fontSize: '27px', fontWeight: '600', right: 0, color:theme.gray1 }}> {
          {
            0: '진입',
            1: '도착',
            2:'출발',
            3:'출발'
          }[trainfo.trainSttus]        //접근중으로 바뀌면 알림 지금은 테스트해보려고 신고문의 누르면 뜨게해둠
        }
        </div>
          </div>
          <div style={{ fontSize: '15px', fontWeight: '400', color: '#aaaaaa' }}>{trainfo.nextStatns?.stationNameList[0].kor}</div>
          <div style={{ fontSize: '15px', fontWeight: '400', color: '#aaaaaa' }}>{trainfo.nextStatns?.stationNameList[1].kor}</div>
          <div style={{ fontSize: '15px', fontWeight: '400', color: '#aaaaaa' }}>{trainfo.nextStatns?.stationNameList[2].kor}</div>
        </div>
        {
          {
            true: <ToastNotification setToastState={setToastState}></ToastNotification>,
            false: '',
          }[toastState]        //접근중으로 바뀌면 알림 지금은 테스트해보려고 신고문의 누르면 뜨게해둠
        }
      </div>
      <div style={{ height: '80px' }} />
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          height: '60px',
          fontSize: '13px',
          fontWeight: 700,
          color: theme.gray1,
          backgroundColor: theme.bacco,
          padding: '20px 0',
          borderRadius: '20px',
          
        }}
      >
        <div
          style={{
            width: '90px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 5,
            borderRight: 'solid white 1px',
            padding: '10px',
          }}
        >
          <RiAlarmWarningFill onClick={()=>{setToastState(true)}} style={{ color: 'FFB833', fontSize: '20px' }} />
          {{
            kor:'신고',
            eng:'report'
          }[lang]}
          <br />
          {
            {
              kor:'문의',
              eng:'inquiry'
            }[lang]
          }
        </div>
        <div
          style={{
            width: '90px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 5,
            borderRight: 'solid white 1px',
            padding: '10px',
          }}
        
        >
          
          <RiKakaoTalkFill onClick={shareKakao} style={{ color: 'FFE600', fontSize: '20px' }} />
          {
            {
              kor:'현위치',
              eng:'Location',
            }[lang]
          }
          <br />
          {
            {
              kor:'공유',
              eng:'sharing',
            }[lang]
          }
        </div>
        <div
          style={{ width: '90px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, padding: '10px' }}
          onClick={() => {
            setModalOpen(true);
            Nextreceive();
          }}
        >
          <RiTimeFill style={{ color: '92FF6B', fontSize: '20px' }} />
          {
            {
              kor:'도착',
              eng:'ETA',
            }[lang]
          }
          <br />
          {
            {
              kor:'예정 시간',
              eng:' ',
            }[lang]
          }
        </div>
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box sx={style}>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            {{
              kor:'도착 예정 시간',
              eng:'estimated time of arrival',
            }[lang]
            }
          </Typography>
          <Typography id='modal-modal-description' sx={{ mt: 2 }}>
            {
              {
                kor:'동작 00:00:00 ~~',
                eng:'dongjak 00:00:00 ing~',
              }[lang]
            }
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default SubwayPage;

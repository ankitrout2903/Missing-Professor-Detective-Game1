import { useState, useEffect } from 'react';

const useUserData = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:3001/users');
        const data = await response.json();
       
      let totalClue1Time = 0;
      let totalClue2Time = 0;
      let totalClue3Time = 0;
      let totalClue4Time = 0;
      let totalClue5Time = 0;
      let totalTotalTime = 0;
      let minTotalTime = Infinity;
      let minClue1Time = Infinity;
      let minClue2Time = Infinity;
      let minClue3Time = Infinity;
      let minClue4Time = Infinity;
      let minClue5Time = Infinity;
      let maxTotalTime = 0;
      let maxClue1Time = -Infinity;
      let maxClue2Time = -Infinity;
      let maxClue3Time = -Infinity;
      let maxClue4Time = -Infinity;
      let maxClue5Time = -Infinity;
      let totalUsersCount = 0;
      let completedUsersCount = 0;

  
      data.forEach((user) => {
        if (user.clue1Time !== 0) {
          totalClue1Time += user.clue1Time;
          minClue1Time = Math.min(minClue1Time, user.clue1Time);
        }
        if (user.clue2Time !== 0) {
          totalClue2Time += user.clue2Time;
          minClue2Time = Math.min(minClue2Time, user.clue2Time);
        }
        if (user.clue3Time !== 0) {
          totalClue3Time += user.clue3Time;
          minClue3Time = Math.min(minClue3Time, user.clue3Time);
        }
        if (user.clue4Time !== 0) {
          totalClue4Time += user.clue4Time;
          minClue4Time = Math.min(minClue4Time, user.clue4Time);
        }
        if (user.clue5Time !== 0) {
          totalClue5Time += user.clue5Time;
          minClue5Time = Math.min(minClue5Time, user.clue5Time);
        }



        totalUsersCount +=  1;
        if (user.completed === true) {
          completedUsersCount +=  1;
        }
        if (user.clue1Time !== 0) {
          totalClue1Time += user.clue1Time;
        }
        if (user.clue2Time !== 0) {
          totalClue2Time += user.clue2Time;
          }
        if (user.clue3Time !== 0) {
          totalClue3Time += user.clue3Time;
          }
        if (user.clue4Time !== 0) {
          totalClue4Time += user.clue4Time;
          }
        if (user.clue5Time !== 0) {
          totalClue5Time += user.clue5Time;
          }
        if (user.totalTime !== 0) {
          totalTotalTime += user.totalTime;
          minTotalTime = Math.min(minTotalTime, user.totalTime);
          maxTotalTime = Math.max(maxTotalTime, user.totalTime);  
        }



        if (user.clue1Time !== 0) {
          totalClue1Time += user.clue1Time;
          maxClue1Time = Math.max(maxClue1Time, user.clue1Time);
        }
        if (user.clue2Time !== 0) {
          totalClue2Time += user.clue2Time;
          maxClue2Time = Math.max(maxClue2Time, user.clue2Time);
        }
        if (user.clue3Time !== 0) {
          totalClue3Time += user.clue3Time;
          maxClue3Time = Math.max(maxClue3Time, user.clue3Time);
        }
        if (user.clue4Time !== 0) {
          totalClue4Time += user.clue4Time;
          maxClue4Time = Math.max(maxClue4Time, user.clue4Time);
        }
        if (user.clue5Time !== 0) {
          totalClue5Time += user.clue5Time;
          maxClue5Time = Math.max(maxClue5Time, user.clue5Time);
        }



      })
      console.log(totalTotalTime, completedUsersCount)
  
      const averageClue1Time = totalClue1Time / completedUsersCount;
      const averageClue2Time = totalClue2Time / completedUsersCount;
      const averageClue3Time = totalClue3Time / completedUsersCount;
      const averageClue4Time = totalClue4Time / completedUsersCount;
      const averageClue5Time = totalClue5Time / completedUsersCount;
      const averageTotalTime = totalTotalTime / completedUsersCount;
      console.log(averageTotalTime);
  
        const formattedData = data.map((user) => ({
          id: user.id,
          avatarUrl: '/assets/images/avatars/avatar_1.png',
          name: user.name,
          company: 'xyz',
          isVerified: true,
          status: user.completed ? 'Completed' : 'Pending',
          score: user.totalTime ? averageTotalTime - user.totalTime  : 0,
        }));

        setUsers(formattedData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, []);

  return users;
};

export default useUserData;

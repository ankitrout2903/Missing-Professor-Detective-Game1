import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components
import Iconify from '../components/iconify';
// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../sections/@dashboard/app';

// ----------------------------------------------------------------------


export default function DashboardAppPage() {
  const theme = useTheme();
  const [average, setAverage] = useState({});

  const calculateAverageTime = async () => {
    try {
      const response = await fetch('http://localhost:3001/users'); // Fetch users data from localhost:3001/user
      const users = await response.json();
  
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

  
      users.forEach((user) => {
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
  
      const averageClue1Time = totalClue1Time / completedUsersCount;
      const averageClue2Time = totalClue2Time / completedUsersCount;
      const averageClue3Time = totalClue3Time / completedUsersCount;
      const averageClue4Time = totalClue4Time / completedUsersCount;
      const averageClue5Time = totalClue5Time / completedUsersCount;
      const averageTotalTime = totalTotalTime / completedUsersCount;
  
      return {
        averageClue1Time,
        averageClue2Time,
        averageClue3Time,
        averageClue4Time,
        averageClue5Time,
        averageTotalTime,
        minTotalTime,
        maxTotalTime,
        completedUsersCount,
        totalUsersCount,
        totalClue1Time ,
        totalClue2Time ,
        totalClue3Time,
        totalClue4Time,
        totalClue5Time,
        totalTotalTime,
        minClue1Time,
        minClue2Time,
        minClue3Time,
        minClue4Time,
        minClue5Time,
        maxClue1Time,
        maxClue2Time,
        maxClue3Time,
        maxClue4Time,
        maxClue5Time,



      };
    } catch (error) {
      console.error('Error calculating average time:', error);
      throw error;
    }
  };
  
  // Usage:
useEffect(() => {
  calculateAverageTime()
  .then((averages) => {
    console.log(averages);
    setAverage(averages);
  })
  .catch((error) => {
    console.error(error);
  });
}, []);
  
  

  return (
    <>
      <Helmet>
        <title> Dashboard </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Number of Participants" total={average.totalUsersCount} icon={'./DashboardIcons/participants.jpg'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Average Time (Seconds)" total={average.averageTotalTime}  color="info" icon={'./DashboardIcons/time.jpg'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Fastest (Seconds)" total={average.minTotalTime} color="warning" icon={'./DashboardIcons/rabbit.jpg'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Slowest (Seconds)" total={average.maxTotalTime} color="error" icon={'./DashboardIcons/turtle.jpg'} />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Time Taken per Clue"
              subheader="subtitle"
              chartLabels={[
                '01/01/2003',
                '02/01/2003',
                '03/01/2003',
                '04/01/2003',
                '05/01/2003',
                
              ]}
              chartData={[

                {
                  name: 'Total',
                  type: 'area',
                  fill: 'gradient',
                  data: [average.totalClue1Time, average.totalClue2Time, average.totalClue3Time, average.totalClue4Time, average.totalClue5Time],
                },
                {
                  name: 'Average',
                  type: 'area',
                  fill: 'gradient',
                  data: [average.averageClue1Time, average.averageClue2Time, average.averageClue3Time, average.averageClue4Time, average.averageClue5Time],
                },
                {
                  name: 'Fastest',
                  type: 'area',
                  fill: 'gradient',
                  data: [average.minClue1Time, average.minClue2Time, average.minClue3Time, average.minClue4Time, average.minClue5Time],
                },
                {
                  name: 'Slowest',
                  type: 'area',
                  fill: 'gradient',
                  data: [average.maxClue1Time, average.maxClue2Time, average.maxClue3Time, average.maxClue4Time, average.maxClue5Time],
                },
               
               
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Clue"
              // Yaha GPT se count krva le ki kitne logo ne kaam kiya hai mtlb clue 0 nhi h
              chartData={[
                { label: 'Clue 1 : Pattern Solving', value: average.averageClue1Time },
                { label: 'Clue 2 : Memory & Recall', value: average.averageClue2Time },
                { label: 'Clue 3 : Visual Spatial Reasoning', value: average.averageClue3Time },
                { label: 'Clue 4 : Critical Thinking', value: average.averageClue4Time },
                { label: 'Clue 5 : Analytical Thinking', value: average.averageClue5Time },
              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.warning.main,
                theme.palette.error.main,
              ]}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

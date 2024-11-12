'use client';
import React, {useState} from 'react';
import {api} from '@/lib/api';

export default function useProfile() {
  return {
    getProfile: async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response: any = await api.profile.get({
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 401) {
          localStorage.removeItem('authToken');
        }
        if (response.status === 404) {
          return null;
        }
        // if 500, 503, etc
        if (response.status >= 500) {
          return null;
        }

        console.log('getProfile', response);

        if (response.status === 200 && response.data) {
          return response.data;
        } else {
          return null;
        }
      } catch (err) {
        return null;
      }
    },
    editProfile: async (props: any) => {
      try {
        const token = localStorage.getItem('authToken');

        if (!token) {
          return null;
        }
        console.log('props', props);
        // Log the contents of formData
        // for (let [key, value] of props.entries()) {
        //   console.log(`${key}:`, value);
        // }

        const response: any = await api.profile.edit.post(
          {
            ...props,
          },
          {
            headers: {Authorization: `Bearer ${token}`},
          }
        );
        console.log(response);

        if (response?.status === 200) {
          return await response.data.body.message;
        } else {
          return null;
        }
      } catch (err) {
        return null;
      }
    },
    getProfileByHandle: async (handle: string) => {
      try {
        const response: any = await api.profile({handle}).get();
        console.log(response);

        if (response.status === 200 && response.data.body.user) {
          return response.data.body.user;
        } else {
          return null;
        }
      } catch (err) {
        return null;
      }
    },
  };
}

// const fetchProfile = async () => {
//   const token = localStorage.getItem("authToken");

//   if (!token) {
//     router.push("/login");
//     return;
//   }

//   try {
//     const response = await api.profile.get({
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     if (response.status === 200) {
//       setUser(response.data.body.user);
//     } else {
//       setError(response.message || "Failed to load profile");
//       localStorage.removeItem("authToken");
//       router.push("/login");
//     }
//   } catch (err) {
//     setError("An error occurred while fetching profile");
//     localStorage.removeItem("authToken");
//     router.push("/login");
//   } finally {
//     setLoading(false);
//   }
// };

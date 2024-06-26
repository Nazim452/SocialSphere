import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import useShowToast from './useShowToast';

const useGetUserProfile = () => {
    const [user, setUser] = useState();
    const [loadig, setLoading] = useState(true);
    const {username} = useParams();
    const showToast = useShowToast();

    useEffect(()=>{
        const getUser = async () => {
          try {
            const res = await fetch(`/api/users/profile/${username}`);
            const data = await res.json();
            // console.log(data);
    
            if (data?.error) {
              showToast("Error", data?.error, "error");
              return;
    
            }

            if(data.isFrozen){
              setUser(null);
              return;
            }
    
            setUser(data);
    
          } catch (error) {
            console.log("Error in getUser", error);
            showToast("Error", data?.error, "error");
    
    
          }
          //either success in fetching user or not  found always setLoading false
          finally {
            setLoading(false);
          }
        }
        getUser();
    
      },[username, showToast])
      // returning for  using in the file as a componnetnt
      return {loadig, user}
    
}

export default useGetUserProfile
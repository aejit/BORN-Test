import { post, patch} from 'axios';

let config = {
    headers: {
      'Content-Type': 'application/json',
    }
  }
  
  export const getGoals = async () => {  
    const response =  await fetch(`http://localhost:9000/goals`,config);
    if (response.status !== 200) {
      throw new Error('received a non ok status');
    }
    return  await response.json();
  }

  export const addGoals = async(dataToSubmitasync) =>{
    const response = await post(`http://localhost:9000/goals`,config);
    return await response;
  };

  export const editGoals = async (dataId, dataToSubmitasync) => {
    const response =  await patch(`http://localhost:9000/goals`,config);
    return await response;
  }

  export const deleteGoals = async (dataId) => {
    const response =  await patch(`http://localhost:9000/goals`,config);
    return await response;
  }

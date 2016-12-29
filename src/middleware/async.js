export default function ({ dispatch }) {
    return next => action => {
        //if action does not have payload
        //work payload doesnt have .then 
        //we just sent it on 
      if (!action.payload || ! action.payload.then) {
          return next(action);
      }
      //make sure action promise is resloved
      action.payload
        .then(response =>{
            //create new action with the old type but 
            //replace the promise with response data
            const newAction = { ...action, payload: response }
            dispatch(newAction);
        })
    };
}
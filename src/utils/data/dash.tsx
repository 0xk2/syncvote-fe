import { finishLoading, startLoading } from '../../redux/reducers/ui.reducer';

const BASE_URL = 'https://decisiontree.herokuapp.com';

export const create = async ({
  json, title, desc, onSuccess, onError = (error:any) => {
    console.error(error);
  }, dispatch,
}:{
  json: any;
  title: string;
  desc: string;
  onSuccess: (data:any) => void;
  onError?: (error:any) => void;
  dispatch: any;
}) => {
  let toSend = {
    title: '', desc: '',
  };
  try {
    toSend = JSON.parse(json);
  } catch (e) {
    onError(e);
    return;
  }
  toSend.title = title;
  toSend.desc = desc;
  dispatch(startLoading({}));
  const response = await fetch(`${BASE_URL}/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(toSend),
  });
  dispatch(finishLoading({}));
  if (response.status === 200) {
    const data = await response.json();
    onSuccess(data);
  } else {
    const data = await response.json();
    onSuccess(data);
  }
};

// export const vote = () => {}

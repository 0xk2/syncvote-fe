import React, { useState } from 'react';
import Button from '@components/Button/Button';
import { useOutletContext } from 'react-router-dom';
import { L } from '@utils/locales/L';
import moment from 'moment';

const dataComments = [
  {
    id: 1,
    urlAvatar: '/assets/images/temp/avatar-vote-1.png',
    name: 'Elena',
    date: 'posted on Jan 10th, 2023',
    content:
      'I think this proposal has great potential for successful investments. The estimated yield looks good, and I would be interested in investing.',
  },
  {
    id: 2,
    urlAvatar: '/assets/images/temp/avatar-vote-2.png',
    name: 'Camile',
    date: 'posted on Jan 10th, 2023',
    content:
      'This proposal looks promising, but I would like to understand more about how the investment will be managed and monitored.',
  },
  {
    id: 3,
    urlAvatar: '/assets/images/temp/avatar-vote-3.png',
    name: 'Elena',
    date: 'posted on Jan 10th, 2023',
    content:
      // eslint-disable-next-line max-len
      "I believe this proposal has a good chance of yielding a substantial return on investment. I am confident in the team's ability to make wise decisions.",
  },
];

const userInfo = {
  id: 3,
  urlAvatar: '/assets/images/temp/avatar-vote-4.png',
  name: 'Camile',
};

const CommentDetail = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [contentComment, setContentComment] = useState<string>('');
  const [commentList, setCommentList] = useState(dataComments);
  const { isAuth, setIsAuth } = useOutletContext<any>();

  const renderComments = () =>
    commentList.map((ele) => (
      <div key={ele.id} className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="rounded-full w-8 h-8 overflow-hidden">
            <img className="w-full object-cover object-center" src={ele.urlAvatar} alt="" />
          </div>
          <div>
            <p className="text-base text-grey-version-7">{ele.name}</p>
            <p className="text-grey-version-6 text-xs">{ele.date}</p>
          </div>
        </div>
        <div>
          <p className="text-grey-version-7 text-xs ml-11">{ele.content}</p>
        </div>
      </div>
    ));

  const handleChangeComment = (e: any) => {
    setContentComment(e.target.value);
  };

  const handlePostComment = () => {
    if (contentComment) {
      const date = `posted on ${moment().format('MMMM Do,YYYY')}`;
      const newComment = {
        id: commentList.length + 1,
        urlAvatar: userInfo.urlAvatar,
        name: userInfo.name,
        date,
        content: contentComment,
      };
      const newCommentList = [newComment, ...commentList];
      setCommentList(newCommentList);
      setContentComment('');
    }
  };

  return (
    <>
      <div className="flex flex-col gap-4">
        <p className="text-xl font-semibold">Comment</p>
        <textarea
          className="w-full h-20 focus:outline-none border-1.5 border-grey-version-3 rounded-8 p-4 font-medium text-xl"
          placeholder="Comment something..."
          onChange={handleChangeComment}
          value={contentComment}
        />
        {isAuth ? (
          <Button
            variant="outline"
            className="w-full h-[60px] text-[17px] border-1.5 border-grey-version-3 leading-[0.5em] tracking-0.5px py-[24px] px-[16px] rounded-xl cursor-pointer"
            onClick={handlePostComment}
          >
            Post
          </Button>
        ) : (
          <Button
            variant="outline"
            className="w-full h-[60px] text-[17px] border-1.5 border-grey-version-3 leading-[0.5em] tracking-0.5px py-[24px] px-[16px] rounded-xl cursor-pointer"
            onClick={() => {
              setIsAuth(!isAuth);
            }}
          >
            {L('connectWalletComment')}
          </Button>
        )}
      </div>
      <div className="flex flex-col gap-8 mt-10">{renderComments()}</div>
    </>
  );
};

export default CommentDetail;

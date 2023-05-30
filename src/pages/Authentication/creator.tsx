
import { L } from '@utils/locales/L';
import Google from '@assets/icons/svg-icons/Google';
import ButtonLogin from '@components/ButtonLogin';
import { useState } from 'react';
import { supabase } from '@utils/supabaseClient';
import { useDispatch } from 'react-redux';
import { startLoading, finishLoading } from '@redux/reducers/ui.reducer';

function CreatorLogin() {
  const dispatch = useDispatch();
  const handleLogin = async (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    dispatch(startLoading({}));
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    });
    dispatch(finishLoading());
    if (error) {
      alert(error.error_description || error.message)
    }
  };

  return (
    <div className="bg-connect text-center w-full">
      <div className="container mx-auto">
        <p className="text-[#252524] text-[34px] font-semibold text-center w-full m-auto mb-[32px] mt-[103px] leading-[41px]">
          {L('joinToBuildYourOwnWorkflow')}
        </p>
        <div className="w-full">
          <ButtonLogin
            className="text-[#252422] max-w-[320px] m-auto min-w-[320px]"
            Icon={<Google />}
            title={`${L('continueWidth')} ${L('google')}`}
            onClick={handleLogin}
          />
        </div>
      </div>
    </div>
  );
}

export default CreatorLogin;

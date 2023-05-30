import { L } from '@utils/locales/L';
import CustomInput from '@pages/Proposal/components/commons/CustomInput';
import { handleThresholdValue } from './helper';

type ThresholdDetail = {
  thresholdValue: any;
  votingDetail: any;
  setThresholdValue: any;
  setVotingDetail: any;
  isReview?: boolean;
};

type Props = {
  thresholdDetail: ThresholdDetail;
};
function ThresholdInput({ thresholdDetail }: Props) {
  const { thresholdValue, votingDetail, setThresholdValue, setVotingDetail, isReview } =
    thresholdDetail;

  return (
    <CustomInput
      childrenClassName="border-none"
      label="thresholdValueForEachResult"
      validate={
        thresholdValue?.value
          ? thresholdValue?.status
          : {
              type: 'WARN',
              message: L('thisFieldIsRequiredPleaseFillIn'),
            }
      }
    >
      <input
        type="text"
        className={`input-token-address text-grey-version-6 border-1.5 ${
          (!thresholdValue?.value || thresholdValue?.status?.type) && 'border-yellow-version-5'
        }
            `}
        value={thresholdValue?.value}
        onChange={(e) =>
          handleThresholdValue({
            nextValue: e.target.value,
            thresholdValue,
            votingDetail,
            setThresholdValue,
            setVotingDetail,
          })
        }
        placeholder="0.1"
        disabled={isReview}
      />
    </CustomInput>
  );
}

export default ThresholdInput;

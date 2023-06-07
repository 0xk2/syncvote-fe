import { Select, Space } from 'antd';

const VotingPartipation = () => {
  return (
    <Space direction="vertical" size="large" className="w-full">
      <Space direction="vertical" size="small" className="w-full">
        <div className="text-lg font-bold">Wallet or token whitelist</div>
        <div className="text-sm">User must either stay in a whitelist or has some token</div>
      </Space>
      <Select
        style={{ width: '100%' }}
        defaultValue="whitelist"
        options={[
          {
            key: 'whitelist',
            label: 'A lits of addresses',
            value: 'whitelist',
          },
          // choosing this option would engage Votemachine
          {
            key: 'spl',
            label: 'A SPL Token owner',
            value: 'spl',
          },
          // choosing this option would engage Votemachine
          {
            key: 'erc20',
            label: 'An ERC20 Token owner',
            value: 'erc20',
          },
        ]}
      />
      <Space direction="vertical" size="small" className="w-full">
        <div className="text-lg font-bold">Voting Power Provider</div>
        <div className="text-sm">Use the vote machine or use 3rd party</div>
      </Space>
      <Select
        style={{ width: '100%' }}
        defaultValue="default"
        options={[
          {
            key: 'default',
            label: 'Use voting power provided by voting program',
            value: '',
          },
          {
            key: 'a_system_owned_address',
            label: 'Provide by SyncVote',
            value: 'a_system_owned_address',
          },
        ]}
      />
    </Space>
  );
};

export default VotingPartipation;

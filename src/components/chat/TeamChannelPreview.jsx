import { Avatar, useChatContext } from 'stream-chat-react';

const TeamChannelPreview = ({
  channel,
  type,
  setActiveChannel,
  setIsCreating,
  setIsEditing,
  setToggleContainer,
}) => {
  const { channel: activeChannel, client } = useChatContext();

  const handleClick = () => {
    setIsCreating(false);
    setIsEditing(false);
    setActiveChannel(channel);
    if (setToggleContainer) setToggleContainer((prev) => !prev);
  };

  const ChannelPreview = () => (
    <p className="channel-preview__item">
      # {channel?.data?.name || channel?.data?.id}
    </p>
  );

  const DirectPreview = () => {
    const members = Object.values(channel.state.members).filter(
      ({ user }) => user.id !== client.user.id
    );

    return (
      <div className="channel-preview__item single">
        <Avatar
          image={members[0]?.user?.image}
          name={members[0]?.user?.fullName || members[0]?.user?.id}
          size={24}
        />
        <p>{members[0]?.user?.fullName || members[0]?.user?.id}</p>
      </div>
    );
  };

  return (
    <div
      className={
        channel?.id === activeChannel?.id
          ? 'channel-preview__wrapper__selected'
          : 'channel-preview__wrapper'
      }
      onClick={handleClick}
    >
      {type === 'team' ? <ChannelPreview /> : <DirectPreview />}
    </div>
  );
};

export default TeamChannelPreview;

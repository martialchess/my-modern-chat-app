import { useState } from 'react';
import { useChatContext } from 'stream-chat-react';

import UserList from './UserList';
import { CloseCreateChannel } from '@/components/shared';

const ChannelNameInput = ({ channelName = '', setChannelName }) => {
  const handleChange = (e) => {
    e.preventDefault();
    setChannelName(e.target.value);
  };

  return (
    <div className="channel-name-input__wrapper">
      <p>Name</p>
      <input
        value={channelName}
        onChange={handleChange}
        placeholder="channel-name"
      />
      <p>Add Members</p>
    </div>
  );
};

const EditChannel = ({ setIsEditing }) => {
  const { channel } = useChatContext();
  const [channelName, setChannelName] = useState(channel?.data?.name || '');
  const [selectedUsers, setSelectedUsers] = useState([]);

  const updateChannel = async (e) => {
    e.preventDefault();

    const nameChanged = channelName !== (channel.data.name || channel.data.id);

    try {
      if (nameChanged) {
        await channel.update(
          { name: channelName },
          { text: `Channel name changed to ${channelName}` }
        );
      }

      if (selectedUsers.length) {
        await channel.addMembers(selectedUsers);
      }

      setChannelName('');
      setIsEditing(false);
      setSelectedUsers([]);
    } catch (error) {
      console.error('Error updating channel:', error);
    }
  };

  return (
    <div className="edit-channel__container">
      <div className="edit-channel__header">
        <p>Edit Channel</p>
        <CloseCreateChannel setIsEditing={setIsEditing} />
      </div>

      <ChannelNameInput
        channelName={channelName}
        setChannelName={setChannelName}
      />
      <UserList setSelectedUsers={setSelectedUsers} />
      <div className="edit-channel__button-wrapper" onClick={updateChannel}>
        <p>Save Changes</p>
      </div>
    </div>
  );
};

export default EditChannel;

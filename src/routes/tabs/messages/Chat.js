import React from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
 
export default class Chat extends React.Component {
  state = {
    messages: [],
  }
 
  componentWillMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'سلام خوبی ؟؟؟؟',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLI6AApYfyTi61SqF0jdUtBM_Xs20V4-rAxxzG3pHGP4FZT2zd',
          },
        },
      ],
    })
  }
 
  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }
 
  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        placeholder="پیام ..."
        locale="fa"
        isAnimated={true}
        showUserAvatar={true}
        showAvatarForEveryMessage={true}
        customTextStyle={{fontFamily: 'IRANSans'}}
        user={{
          _id: 1,
        }}
      />
    )
  }
}

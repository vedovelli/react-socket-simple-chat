// container component

import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import dayjs from 'dayjs';

import { ContainerBody, ContainerFooter } from 'chat/components/layout';
import { Messages } from 'chat/components/message';

import ChatRoomFooter from './ChatRoomFooter';

import constants from 'chat/constants'

import {
  operations as MessagesOperations,
  selectors as MessagesSelectors
} from 'chat/states/ducks/messages';
import { selectors as SettingsSelectors } from 'chat/states/ducks/settings';


export class ChatRoom extends Component {

  // https://reactjs.org/docs/typechecking-with-proptypes.html
  static propTypes = {
    theme: PropTypes.string,
    isMobile: PropTypes.bool
  };

  // https://reactjs.org/docs/react-without-es6.html#declaring-default-props
  static defaultProps = {
    isMobile: constants.isMobile
  };

  handleSubmit = ( message ) => {
    const { sendMessage, userName } = this.props;
    sendMessage( message, userName );
  }

  render() {
    const {
      isMobile,
      userName, theme, clockDisplay, listenSendKeys,
      messages
    } = this.props;

    return (
      <Fragment>

        <ContainerBody className="chatroom" theme={ theme }>
          <Messages
            theme={ theme }
            userName={ userName }
            clockDisplay={ clockDisplay }
            data={ messages }
          />
        </ContainerBody>

        <ChatRoomFooter
          theme={ theme }
          onSubmit={ this.handleSubmit }
          listenSendKeys={ listenSendKeys }
          isMobile={ isMobile }
        />
      </Fragment>
    );
  }
}

//----------------------------------------------------------------------------//

const mapStateToProps = ( state ) => ({
  messages: MessagesSelectors.getMessages(state),
  userName: SettingsSelectors.getUserName( state ),
  theme: SettingsSelectors.getTheme( state ),
  clockDisplay: SettingsSelectors.getClockDisplay( state ),
  listenSendKeys: SettingsSelectors.getListenSendKeys( state )
});

// https://egghead.io/lessons/javascript-redux-using-mapdispatchtoprops-shorthand-notation
const mapDispatchToProps = {
  sendMessage: MessagesOperations.send
}

const ChatRoomReduxConnected = connect(mapStateToProps, mapDispatchToProps)(ChatRoom);

// https://reacttraining.com/react-router/web/guides/redux-integration
const ChatRoomReduxWithRouter = withRouter(ChatRoomReduxConnected);

export default ChatRoomReduxWithRouter;

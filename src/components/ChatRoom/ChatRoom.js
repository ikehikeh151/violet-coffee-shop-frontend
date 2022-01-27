import React from "react";
import "./ChatRoom.scoped.css";

export default function ChatRoom() {
  return (
    <div className="right-section">
      <p className="section-title">Jason</p>
      <div className="chat-box">
        <div className="message-sent">
          <img
            src={require("../../assets/images/background-chat.jpg")}
            alt="user"
          />
          <div className="message-content">
            <p className="message">
              Hey jason, I can't find the promo section. Can u tell me where is
              it?
            </p>
            <div className="message-status-time">
              <p className="message-time">✓✓ 02.14 PM</p>
            </div>
          </div>
        </div>
        <hr />
        <div className="message-received">
          <img
            src={require("../../assets/images/background-chat.jpg")}
            alt="user"
          />
          <div className="message-content">
            <p className="message">
              Hey, thanks for asking. It's in product menu, you can see them on
              the left side.
            </p>
            <div className="message-status-time">
              <p className="message-time">02.14 PM</p>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="chat-list">
        <div className="chat-item">
          <img
            src={require("../../assets/images/background-chat.jpg")}
            alt="user"
          />
          <div className="chat-content">
            <p className="chat-message">
              Hey jason, I can't find the promo section. Can u tell me where is
              it?
            </p>
          </div>
        </div>
        <hr />
      </div> */}
      <div className="message-box">
        <textarea placeholder="Type a message" />
      </div>
    </div>
  );
}

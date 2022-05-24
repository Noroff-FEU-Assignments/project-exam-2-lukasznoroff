import {useState} from "react";
import styled from "styled-components";
import AdminAddHotel from "./AdminAddHotel";
import AdminContact from "./AdminContact";
import AdminBooking from "./AdminBooking";

function Tabs() {

    const [toggleState, setToggleState] = useState(1);
    const toggleTab = (index) => {
        setToggleState(index);
    };

    return (
        <WrapContainer>
            <div className="bloc-tabs">
                <button
                    className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
                    onClick={() => toggleTab(1)}
                >
                    <h5>Add new hotel</h5>
                </button>
                <button
                    className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
                    onClick={() => toggleTab(2)}
                >
                    <h5>Email message</h5>
                </button>
                <button
                    className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
                    onClick={() => toggleTab(3)}
                >
                    <h5>Booking</h5>
                </button>
            </div>

            <div className="content-tabs">
                <div className={toggleState === 1 ? "content  active-content" : "content"}>
                    <AdminAddHotel/>
                </div>

                <div className={toggleState === 2 ? "content  active-content" : "content"}>
                    <AdminContact/>
                </div>
                <div className={toggleState === 3 ? "content  active-content" : "content"}>
                    <AdminBooking/>
                </div>
            </div>
        </WrapContainer>
    );
}

export default Tabs;


const WrapContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
  background: #f1f1f1;
  margin: 100px auto 0;
  word-break: break-all;
  border: 1px solid rgba(0, 0, 0, 0.274);
  margin-bottom: 100px;
  .bloc-tabs {
    display: flex;
  }

  .tabs {
    padding: 15px;
    text-align: center;
    width: 50%;
    background: rgba(128, 128, 128, 0.075);
    cursor: pointer;
    border-bottom: 1px solid rgba(0, 0, 0, 0.274);
    box-sizing: content-box;
    position: relative;
    outline: none;
  }

  .tabs:not(:last-child) {
    border-right: 1px solid rgba(0, 0, 0, 0.274);
  }

  .active-tabs {
    background: white;
    border-bottom: 1px solid transparent;
  }

  .active-tabs::before {
    content: "";
    display: block;
    position: absolute;
    top: -5px;
    left: 50%;
    transform: translateX(-50%);
    width: calc(100% + 2px);
    height: 5px;
    background: #e6b022;
  }

  button {
    border: none;
  }

  .content-tabs {
    flex-grow: 1;
  }

  .content {
    background: white;
    padding: 20px;
    width: 100%;
    height: 100%;
    display: none;
  }

  .content h2 {
    padding: 0px 0 5px 0px;
  }

  .content hr {
    width: 100px;
    height: 2px;
    background: #222;
    margin-bottom: 5px;
  }

  .content p {
    width: 100%;
    //height: 100%;
  }

  .active-content {
    display: block;
  }
`;
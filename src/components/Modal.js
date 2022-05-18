import styled from "styled-components";

const Modal = ({children}) => {
    return (
        <Wrapper>
            <p>{children}</p>
        </Wrapper>
    )
};

export default Modal;


const Wrapper = styled.div`
  z-index: 99;
  text-align: center;
  position: absolute;
  left: 50%;
  bottom: -50%;
  transform: translate(-50%, 0);
  background-color: #fff;
  padding: 20px;
  height: 200px;
  width: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #000;
`;


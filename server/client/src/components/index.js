import styled from 'styled-components';

const Div = styled.div `
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 300px;
`;
const Content = styled.div `
  display: flex;
  flex-flow: column;
`;
const DivHeader = styled.div `
  height: 100px;
  background: black;
`;
const DivContent = styled.div `
  margin: 27px auto;
  width: 800px;
  border: 1px solid white;
  background: white;
`;
const DivText = styled.div `
  margin: 0 auto;
  width: 400px;
`;
const DivFooter = styled.div `
  // position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100px;
  background: black;
  -webkit-box-reflect: below;
`;
const DivRegistration = styled.div `
  display: flex;
  flex-direction: row nowrap;
  justify-content: flex-end;
`;
const DivReg = styled.div `
  margin: 0 auto;
  width: 400px;
  display: flex;
  flex-flow: column;
`;
const DivInfo = styled.div `
  display: flex;
  flex-direction: row nowrap;
  justify-content: space-around;
  width: 350px;
  margin-left: -25px;
`;

export {Div, DivHeader, DivContent, DivFooter, DivText, DivRegistration, DivReg, Content, DivInfo};
import Topbar from "./TopBar";
import PostUser from "./PostUser";
import React from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ScheduleSendIcon from "@mui/icons-material/ScheduleSend";
import { ApiContext } from "./api";
import style from "styled-components";
import PrintPostUser from "./PrintPostUser";
import { useQuery } from "react-query";

const StyleDivProfile = style.div`
display: flex;

`;

const StyleDivRightTop = style.div`
    flex: 4;
      display: flex;
      align-items: center;
      justify-content: space-around;
      color: white;

`;

const StyleProfileCover = style.div`
width: 100%;
height:180px;
object-fit: cover;

`;

const StyleProfileInfo = style.div`
display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

`;

const StyleProfileInfoName = style.h2`
height: 120px !important;
font:bold;
font-size: 50px;
transform: translate(-10px, 140px) !important;

`;

const StyleProfileCoverImg = style.img`
width: 100%;
height: 250px;
object-fit: cover;

`;

const StyleProfileUserImg = style.img`
      width: 250px;
      height: 250px;
      border-radius: 50%;
      object-fit: cover;
      position: absolute;
      left: 0;
      right: 0;
      margin: auto;
      top: 150px;
      border: 3px solid white;
      transform: translate(-30px, 0px) ; 
`;

const StyleaAddOrSend = style.span`

transform: translate(100px, 0px) !important;
`;

export default function Profile(props: any) {
  const location = useLocation();
  const user = location.state as any;
  const [change, setChange] = React.useState(false);

  const api = React.useContext(ApiContext);
  const { status, data: utenteConnesso } = useQuery(
    ["currentUserProfile"],
    async () => {
      return await api.getCurrentUser();
    }
  );

  const userLoggato = utenteConnesso;
  const profiloVisitato = user.profiloVisitato || userLoggato;
  return (
    <>
      {status === "loading" ? (
        <span> </span>
      ) : status === "error" ? (
        <span>error</span>
      ) : (
        <>
          {" "}
          <Topbar />
          <StyleDivProfile>
            <StyleDivRightTop>
              <div>
                <StyleProfileCover>
                  <StyleProfileCoverImg src="asset/sociale2.png" alt="" />
                  <StyleProfileUserImg src="asset/social.jpg" alt="" />
                </StyleProfileCover>

                <StyleProfileInfo>
                  <StyleProfileInfoName>{profiloVisitato}</StyleProfileInfoName>

                  <StyleaAddOrSend>
                    {" "}
                    {change ? (
                      <ScheduleSendIcon
                        titleAccess="in attesa di approvazione"
                        onClick={() => {
                          setChange(false);
                        }}
                      />
                    ) : (
                      <PersonAddIcon
                        titleAccess="invia richiesta di amicizia"
                        onClick={() => {
                          setChange(true);

                          api.addFriendRequest(userLoggato, profiloVisitato);
                        }}
                      />
                    )}
                  </StyleaAddOrSend>
                  {/* <PrintPostUser user={profiloVisitato || utenteConnesso} /> */}
                </StyleProfileInfo>
              </div>
            </StyleDivRightTop>
          </StyleDivProfile>
        </>
      )}
    </>
  );
}

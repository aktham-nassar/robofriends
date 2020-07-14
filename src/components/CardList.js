import React from "react";
//import { robots } from './robots';
import Card from "./Card";

const CardList = ({ robots }) => {
  /*    if (true){
        throw new Error('Noooo');
    }*/
  const cardsArray = robots.map((user, i) => {
    return <Card id={user.id} key={i} name={user.name} email={user.email} />;
  });
  return <div>{cardsArray}</div>;
};
export default CardList;

import React from 'react';

export default function Chart(props) {
  return (
    <>
      <div>{props.title}</div>
      <div>{props.children}</div>
    </>
  );
}

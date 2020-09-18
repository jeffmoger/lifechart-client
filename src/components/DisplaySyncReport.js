import React from 'react';

const DisplaySyncReport = (props) => {
  const { data } = props;
  return (
    <table>
      <thead>
        <tr>
          <td>Data Source</td>
          <td>Modified</td>
          <td>New</td>
        </tr>
      </thead>
      <tbody>
        {data.map((dat, index) => (
          <tr key={index}>
            <td>{dat[0].replace('com.google.', '')}</td>
            <td>{dat[1]}</td>
            <td>{dat[2]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DisplaySyncReport;

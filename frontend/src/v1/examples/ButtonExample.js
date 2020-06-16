import React from 'react';
import Button from '@/v1/components/Button/Button';

class ButtonExample extends React.PureComponent {

  onClick = () => {
    console.log('click');
  }

  render() {
    return (
      <Button onClick={this.onClick}>Hello World!</Button>
    );
  }
}

export default ButtonExample;

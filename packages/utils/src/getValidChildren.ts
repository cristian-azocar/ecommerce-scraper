import React from 'react';

function getValidChildren(children: React.ReactNode): React.ReactElement[] {
  return React.Children.toArray(children).filter((child) =>
    React.isValidElement(child)
  ) as React.ReactElement[];
}

export default getValidChildren;

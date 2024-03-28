import React from "react";

type Props = {
  data: string[] | null;
  error: string | unknown;
  isLoading: boolean;
};

export const List: React.FC<Props> = ({ data, isLoading, error }) => {
  console.log(data, isLoading, error);
  return <div>List</div>;
};

const isvalidInteger = (text: string): boolean => {
  
    const match = String(text)
        .toLowerCase()
        .match(
          /^[0-9]+$/
        );
  
      return !!match;
  };

export const isInteger = (text: string): string | undefined => {
    return isvalidInteger(text) ? undefined
    : 'Integer value is required';
};
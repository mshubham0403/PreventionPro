const formStrToCam = str => {
    const splitted = str.split("-");
    if (splitted.length === 1) return splitted[0];
    return (
      splitted[0] +
      splitted
        .slice(1)
        .map(word => word[0].toUpperCase() + word.slice(1))
        .join("")
    );
  };
  
  export const styFrmStr = str => {
  
    const style = {};
    str.split(";").forEach(el => {
      const [property, value] = el.split(":");
      if (!property) return;
  
      const formattedProperty = formStrToCam(property.trim());
      style[formattedProperty] = value.trim();
    });
  
    return style;
  };
  
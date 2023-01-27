import React, { useEffect, useRef } from 'react';
import anime from 'animejs';


function LettersAnimation(text) {
    useEffect(() => {
              outerRef.current.innerHTML = outerRef.current.textContent.replace(/\S/g,`<span class='letter'>$&</span>`
              );
        anime.timeline({loop: false})
          .add({
            // targets: '.ml9 .letter',
            targets: '.letter',
            scale: [0, 1],
            duration: .75500,
            elasticity: 600,
            delay: (el, i) => 45 * (i+1)
          })
    })

  return (
    <>
      <span className="text-wrapper">
        <span className="letters" ref={outerRef}>{text}</span>
      </span>
    </>
  );
}

export default LettersAnimation
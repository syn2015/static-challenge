<template>
  <div class="loader"></div>
  <!-- <div class="content">
    <svg
      class="spinner"
      width="65px"
      height="65px"
      viewBox="0 0 66 66"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        class="path"
        fill="none"
        stroke-width="6"
        stroke-linecap="round"
        cx="33"
        cy="33"
        r="30"
      />
    </svg>
  </div> -->
</template>

<script>
export default {
  name: "Loading"
};
</script>

<style scoped lang="scss">
// This is just to center the spinner

// .content {
//   height: 100%;
//   display: flex;
//   align-items: center;
//   justify-content: center;
// }

// // Here is where the magic happens

// $offset: 187;
// $duration: 0.5s;

// .spinner {
//   animation: rotator $duration linear infinite;
// }

// @keyframes rotator {
//   0% {
//     transform: rotate(0deg);
//   }
//   100% {
//     transform: rotate(270deg);
//   }
// }

// .path {
//   stroke-dasharray: $offset;
//   stroke-dashoffset: 0;
//   transform-origin: center;
//   animation: dash $duration ease-in-out infinite,
//     colors ($duration * 4) ease-in-out infinite;
// }

// @keyframes colors {
//   0% {
//     stroke: #4285f4;
//   }
//   25% {
//     stroke: #de3e35;
//   }
//   50% {
//     stroke: #f7c223;
//   }
//   75% {
//     stroke: #1b9a59;
//   }
//   100% {
//     stroke: #4285f4;
//   }
// }

// @keyframes dash {
//   0% {
//     stroke-dashoffset: $offset;
//   }
 
//   50% {
//     stroke-dashoffset: $offset/4;
//     transform: rotate(135deg);
//   }
  
//   100% {
//     stroke-dashoffset: $offset;
//     transform: rotate(450deg);
//   }
// }
@keyframes before {
  0% {
    width: 0.5em;
    box-shadow: 1em -0.5em rgba(225, 20, 98, 0.75),
      -1em 0.5em rgba(111, 202, 220, 0.75);
  }
  35% {
    width: 2.5em;
    box-shadow: 0 -0.5em rgba(225, 20, 98, 0.75),
      0 0.5em rgba(111, 202, 220, 0.75);
  }
  70% {
    width: 0.5em;
    box-shadow: -1em -0.5em rgba(225, 20, 98, 0.75),
      1em 0.5em rgba(111, 202, 220, 0.75);
  }
  100% {
    box-shadow: 1em -0.5em rgba(225, 20, 98, 0.75),
      -1em 0.5em rgba(111, 202, 220, 0.75);
  }
}
@keyframes after {
  0% {
    height: 0.5em;
    box-shadow: 0.5em 1em rgba(61, 184, 143, 0.75),
      -0.5em -1em rgba(233, 169, 32, 0.75);
  }
  35% {
    height: 2.5em;
    box-shadow: 0.5em 0 rgba(61, 184, 143, 0.75),
      -0.5em 0 rgba(233, 169, 32, 0.75);
  }
  70% {
    height: 0.5em;
    box-shadow: 0.5em -1em rgba(61, 184, 143, 0.75),
      -0.5em 1em rgba(233, 169, 32, 0.75);
  }
  100% {
    box-shadow: 0.5em 1em rgba(61, 184, 143, 0.75),
      -0.5em -1em rgba(233, 169, 32, 0.75);
  }
}
.loader {
  position: relative;
  top: calc(50% - 1.25em);
  left: calc(50% - 1.25em);
  width: 2.5em;
  height: 2.5em;
  transform: rotate(165deg);
  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    display: block;
    width: 0.5em;
    height: 0.5em;
    border-radius: 0.25em;
    transform: translate(-50%, -50%);
  }
  &:before {
    animation: before 2s infinite;
  }
  &:after {
    animation: after 2s infinite;
  }
}
</style>

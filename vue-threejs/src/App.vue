<template>
  <div class="container" style="position: absolute"></div>
</template>

<script>
  import * as THREE from "three";

  let camera, scene, renderer, light, cube;

  export default {
    name: "TheCanvas",
    data: function () {
      return {};
    },
    mounted: function () {
      // renderer
      renderer = new THREE.WebGLRenderer();
      renderer.setPixelRatio(window.devicePixelRatio);
      document.body.appendChild(renderer.domElement);

      renderer.setSize(window.innerWidth, window.innerHeight);

      // scnee
      scene = new THREE.Scene();

      // camera
      camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        200,
      );
      camera.position.z = 2;

      //light
      const color = 0xffffff;
      const intensity = 1;
      light = new THREE.DirectionalLight(color, intensity);
      light.position.set(-1, 2, 4);
      scene.add(light);

      // object
      const geometry = new THREE.BoxGeometry(1, 1, 1); // 정육면체
      const material = new THREE.MeshPhongMaterial({color: 0x7fffd4}); // aquamarine

      cube = new THREE.Mesh(geometry, material);
      scene.add(cube);

      function animate(time) {
        requestAnimationFrame(animate);
        time *= 0.001;
        cube.rotation.x = time;
        cube.rotation.y = time;
        renderer.render(scene, camera);
      }
      requestAnimationFrame(animate);
    },
  };
</script>

<style></style>

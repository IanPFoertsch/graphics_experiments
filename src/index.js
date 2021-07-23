import * as THREE from "three/build/three.module"

function main() {
  const canvas = document.querySelector('#canvas');
  const renderer = new THREE.WebGLRenderer({ canvas });


  const camera = new THREE.PerspectiveCamera(75, 2, 0.1, 100);

  camera.position.set(0,50,0)
  camera.up.set(0,0,1)
  camera.lookAt(0,0,0)

  const scene = new THREE.Scene();
  const objects = []
  const geometry = new THREE.DodecahedronGeometry(2, 1);
  const material = new THREE.MeshPhongMaterial({ color: 0x0055ff, emissive: 0x0055ff });  // greenish blue
  const light = new THREE.DirectionalLight(0xFFFFFF, 1)

  light.position.set(-1,2,4)
  scene.add(light)
  const sun = new THREE.Mesh(geometry, material);
  sun.scale.set(5,5,5)
  const earthMaterial = new THREE.MeshPhongMaterial({color: 0xFFFF00, emissive: 0xFFFF00})
  const earthMesh = new THREE.Mesh(geometry, earthMaterial)


  // earthMesh.scale.set(0.2,0.2,0.2)

  const earthOrbit = new THREE.Object3D()
  earthOrbit.position.set(20,0,0)

  const lunarOrbit = new THREE.Object3D()
  const lunaMaterial = new THREE.MeshPhongMaterial({ color: 0x999999, emissive: 1 })
  const luna = new THREE.Mesh(geometry, lunaMaterial)
  luna.scale.set(0.5, 0.5, 0.5)
  lunarOrbit.position.set(5,0,0)


  const solarSystem = new THREE.Object3D()

  scene.add(solarSystem)
  solarSystem.add(sun)
  solarSystem.add(earthOrbit)

  earthOrbit.add(earthMesh)
  earthOrbit.add(lunarOrbit)

  lunarOrbit.add(luna)



  objects.push(solarSystem)
  objects.push(earthOrbit)
  objects.push(lunarOrbit)
  objects.push(luna)
  objects.push(sun)
  objects.push(earthMesh)

  objects.forEach((node) => {
    const axes = new THREE.AxesHelper()
    axes.material.depthTest = false
    axes.renderOrder = 1
    node.add(axes)
  })

  function resizeRendererToDisplaySize(renderer) {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  function render(time) {
    time *= 0.0001;  // convert time to seconds

    if (resizeRendererToDisplaySize(renderer)) {
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    // sun.rotation.x = time;
    objects.forEach((object) => { object.rotation.y = time })

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }
  requestAnimationFrame(render)

  // renderer.render(scene, camera);
}

main();

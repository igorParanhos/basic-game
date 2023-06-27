export class Vector {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
}

export const createVector = (x, y, z) => {
  return new Vector(x, y, z);
};

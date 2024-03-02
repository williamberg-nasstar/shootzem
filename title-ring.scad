$fn=200;
projection() {
rotate([-85,50,0]) {

// C

// C ring

difference() {
difference() {
 scale([1.3,1.05,1]) cylinder(1, 70, 70);
 scale([1.38,1,1]) cylinder(1, 65, 65);
}
translate([-40,-40,-10]) cube(200);
}

}
}
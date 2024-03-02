$fn=200;
projection() {
rotate([-85,50,0]) {

// C
rotate ([90,0,0]) {
 difference() {
  cylinder(4,50,50);
  translate([5,0,0]) rotate([0,0,-3]) scale([0.85,1,1]) cylinder(5,43,43);
  translate([50, 0, 0]) cube([100, 30, 20], true);
 }
}

// C ring
difference() {
 scale([1.3,1.05,1]) cylinder(1, 70, 70);
 scale([1.38,1,1]) cylinder(1, 65, 65);
}

// stars
translate([60,0,35])
rotate ([90,0,0]) {
 difference() {
  cylinder(4,10,10);
  translate([10,10,0]) cylinder(4,10,10);
  translate([-10,10,0]) cylinder(4,10,10);
  translate([-10,-10,0]) cylinder(4,10,10);
  translate([10,-10,0]) cylinder(4,10,10);
 }
}

translate([80,0,42.5]) rotate ([90,0,0]) 
cylinder(4,2,2);

// elestines
translate([55,0,-45])
scale([2.5,1,1])
rotate ([90,0,0]) {
 linear_extrude(4)
 text("elestines", size = 40, font = "Century Gothic");
}
}
}
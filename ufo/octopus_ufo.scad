$fa = 30;
module porthole() {
 rotate([9,27,270]) scale([3,3,0.8]) sphere(3);
}

module rotate_about_pt(a, v, pt) {
    translate(pt)
        rotate(a,v)
            translate(-pt)
                children();   
}

difference() { difference() {
 import("G:/stuff/projects/ufo/simplify_simplify_Octo.stl", convexity=3);

translate([93, 96, 44]) sphere(9);
}
translate([118.5, 103.5, 40]) sphere(6);
}


translate([103, 107, 40]) sphere(9);
translate([118, 106, 40]) sphere(8);

translate([93, 63, 7]) porthole();
rotate_about_pt(60,0,[105,105,0]) translate([93, 63, 7]) porthole();
rotate_about_pt(120,0,[105,105,0]) translate([93, 63, 7]) porthole();
rotate_about_pt(180,0,[105,105,0]) translate([93, 63, 7]) porthole();
rotate_about_pt(240,0,[105,105,0]) translate([93, 63, 7]) porthole();
rotate_about_pt(300,0,[105,105,0]) translate([93, 63, 7]) porthole();

translate([105, 105, 0]) sphere(30);
translate([105, 105, 0]) cylinder(15, 60, 30);
translate([105, 105, -3]) cylinder(3, 60, 60);
translate([105, 105, 0]) rotate([180,0,0])cylinder(15, 60, 30);


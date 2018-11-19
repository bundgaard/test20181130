package main

import (
	"fmt"
	"log"
	"strconv"
	"strings"
)

func tokens(code string) []string {
	return strings.Split(code, ", ")
}

func command(token string) (string, int) {
	turn := token[:1]
	num, err := strconv.Atoi(token[1:])
	if err != nil {
		log.Fatal(err)
	}
	return turn, num
}
func getheading(turn string, lastHeading int) int {
	newHeading := lastHeading
	switch turn {
	case "R":
		newHeading = newHeading + 1
	case "L":
		newHeading = newHeading - 1
	}
	newHeading = newHeading % 4
	return absolute(newHeading)
}

func getx(heading, lastx, distance int) int {
	switch heading {
	case 1:
		fmt.Println("move east", distance)
		return (lastx + distance)
	case 3:
		fmt.Println("move west", distance)
		return (lastx - distance)
	default:
		return lastx
	}
}
func gety(heading, lasty, distance int) int {
	switch heading {
	case 0:
		fmt.Println("move up", distance)
		return (lasty + distance)
	case 2:
		fmt.Println("move down", distance)
		return (lasty - distance)
	default:
		return lasty
	}
}
func absolute(n int) int {
	if n < 0 {
		return (-1 * n)
	}
	return n
}

func find(arr points, p point) bool {
	for _, elm := range arr {
		if p.x == elm.x && p.y == elm.y {
			return true
		}
	}
	return false
}

type point struct {
	x   int
	y   int
	idx int
}

func (p point) String() string {
	return fmt.Sprintf("[%d,%d]", p.x, p.y)
}

type points []point

func (p points) String() string {
	var result []string
	for _, point := range p {
		result = append(result, fmt.Sprintf("%s,", point))
	}
	return "[" + strings.Join(result, "") + "];"
}
func run(program string) {
	if len(program) > 15 {
		fmt.Println("Program", program[0:15]+"...")
	} else {
		fmt.Println("Program", program)
	}
	compass := []string{"north", "east", "south", "west"}
	direction := 0
	x := 0
	y := 0
	locations := make(points, 0)
	for _, token := range tokens(program) {
		turn, steps := command(token)
		var rotation int
		if turn == "R" {
			rotation = 1
		} else {
			rotation = -1
		}
		direction = (direction + rotation + 4) % 4
		fmt.Println("direction", compass[direction])
		switch compass[direction] {
		case "north":
			y += steps
		case "east":
			x += steps
		case "south":
			y -= steps
		case "west":
			x -= steps
		}
		p := point{x: x, y: y}
		if find(locations, p) {
			fmt.Println(absolute(x) + absolute(y))
		}
		locations = append(locations, p)
	}
	fmt.Println("last x,y", x, y)
	fmt.Println(absolute(x) + absolute(y))
	fmt.Println("let a =", locations)

}

func main() {

	test1 := "R2, L3"
	run(test1)
	test2 := "R5, L5, R5, R3"
	run(test2)
	test3 := "R2, R2, R2"
	run(test3)
	test4 := "R8, R4, R4, R8"
	run(test4)

	/* 	challenge := "R1, R3, L2, L5, L2, L1, R3, L4, R2, L2, L4, R2, L1, R1, L2, R3, L1, L4, R2, L5, R3, R4, L1, R2, L1, R3, L4, R5, L4, L5, R5, L3, R2, L3, L3, R1, R3, L4, R2, R5, L4, R1, L1, L1, R5, L2, R1, L2, R188, L5, L3, R5, R1, L2, L4, R3, R5, L3, R3, R45, L4, R4, R72, R2, R3, L1, R1, L1, L1, R192, L1, L1, L1, L4, R1, L2, L5, L3, R5, L3, R3, L4, L3, R1, R4, L2, R2, R3, L5, R3, L1, R1, R4, L2, L3, R1, R3, L4, L3, L4, L2, L2, R1, R3, L5, L1, R4, R2, L4, L1, R3, R3, R1, L5, L2, R4, R4, R2, R1, R5, R5, L4, L1, R5, R3, R4, R5, R3, L1, L2, L4, R1, R4, R5, L2, L3, R4, L4, R2, L2, L4, L2, R5, R1, R4, R3, R5, L4, L4, L5, L5, R3, R4, L1, L3, R2, L2, R1, L3, L5, R5, R5, R3, L4, L2, R4, R5, R1, R4, L3"
	   	run(challenge)
	*/
}

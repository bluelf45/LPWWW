export default function Conditional({ condition, children1, children2 }) {
	if (condition) return children1;
	return children2;
}

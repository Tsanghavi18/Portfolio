// Joins class names and skips empty values: cn("a", false && "b", "c") -> "a c"
export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

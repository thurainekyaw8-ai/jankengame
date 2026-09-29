<?php

header("Content-Type: application/json");

$playerChoice = $_POST["choice"] ?? "";

$validChoices = ["rock", "paper", "scissors"];

if (!in_array($playerChoice, $validChoices)) {
    echo json_encode([
        "success" => false,
        "message" => "Invalid choice"
    ]);

    exit;
}

$computerChoice = $validChoices[array_rand($validChoices)];

if ($playerChoice === $computerChoice) {
    $result = "draw";
} elseif (
    ($playerChoice === "rock" && $computerChoice === "scissors") ||
    ($playerChoice === "paper" && $computerChoice === "rock") ||
    ($playerChoice === "scissors" && $computerChoice === "paper")
) {
    $result = "win";
} else {
    $result = "lose";
}

echo json_encode([
    "success" => true,
    "playerChoice" => $playerChoice,
    "computerChoice" => $computerChoice,
    "result" => $result
]);

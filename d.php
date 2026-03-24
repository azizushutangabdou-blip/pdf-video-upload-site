<?php
$targetDir = "uploads/";
if (!file_exists($targetDir)) {
    mkdir($targetDir, 0777, true);
}

if (isset($_FILES["file"])) {
    $fileName = basename($_FILES["file"]["name"]);
    $targetFile = $targetDir . $fileName;
    $fileType = strtolower(pathinfo($targetFile, PATHINFO_EXTENSION));

    // Allowed file types
    $allowedTypes = ["pdf", "mp4", "mov", "avi", "mkv"];

    if (in_array($fileType, $allowedTypes)) {
        if (move_uploaded_file($_FILES["file"]["tmp_name"], $targetFile)) {
            echo "✅ File uploaded successfully: " . htmlspecialchars($fileName);
        } else {
            echo "❌ Error uploading file.";
        }
    } else {
        echo "❌ Only PDF and video files are allowed.";
    }
} else {
    echo "No file uploaded.";
}
?>

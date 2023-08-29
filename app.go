package main

import (
	"context"
	"fmt"
	"log"
	"time"

	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite"
)

// App struct
type App struct {
	ctx context.Context
	db  *gorm.DB
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx

	var err error
	a.db, err = gorm.Open("sqlite3", "snippets_data.db") // TODO: in appdata/ somewhere hidden
	if err != nil {
		log.Fatal(err)
		return
	}
	a.db.LogMode(true)

	// Migrate the schema
	a.db.AutoMigrate(&Folder{}, &File{})
}

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}

func (a *App) CreateFolder(name string) Folder {
	log.Println("Creating folder", name)
	folder := Folder{Name: name}
	a.db.Create(&folder)
	return folder
}

func (a *App) GetFolder(folderID uint) Folder {
	var folder Folder
	a.db.Preload("Files").Find(&folder, folderID)
	return folder
}

func (a *App) GetAllFolders() []Folder {
	var folders []Folder
	a.db.Preload("Files").Find(&folders)
	return folders
}

func (a *App) DeleteFolder(folderID uint) error {
	err := a.DeleteFilesByFolderID(folderID)
	if err != nil {
		return err
	}

	result := a.db.Delete(&Folder{}, folderID)
	if result.Error != nil {
		return result.Error
	}

	log.Println("Deleted folder with ID", folderID)
	return nil
	// TODO delete all files in folder
}

func (a *App) CreateFile(name, extension, content string, folderID uint) {
	file := File{Name: name, Extension: extension, Content: content, FolderID: folderID}
	a.db.Create(&file)
	log.Println("Created file", name, extension, folderID)
}

func (a *App) GetFile(id uint) File {
	var file File
	a.db.First(&file, id)
	return file
}

func (a *App) DeleteFile(fileID uint) error {
	result := a.db.Delete(&File{}, fileID)
	if result.Error != nil {
		return result.Error
	}
	log.Println("Deleted file with ID", fileID)
	return nil
}

func (a *App) DeleteFilesByFolderID(folderID uint) error {
	result := a.db.Where("folder_id = ?", folderID).Delete(File{})
	if result.Error != nil {
		return result.Error
	}
	log.Println("Deleted files by folder ID", folderID)
	return nil
}

func (a *App) UpdateFile(id uint, name, extension, content string, folderID uint) {
	var file File
	a.db.First(&file, id)
	file.Name = name
	file.Extension = extension
	file.Content = content
	file.FolderID = folderID
	a.db.Save(&file)
}

func (a *App) UpdateFileContent(id uint, content string) {
	var file File
	a.db.First(&file, id)
	file.Content = content
	a.db.Save(&file)
}

func (a *App) UpdateFileName(id uint, name string) {
	var file File
	a.db.First(&file, id)
	file.Name = name
	a.db.Save(&file)
}

type Model struct {
	ID        uint `gorm:"primary_key" json:"id"`
	CreatedAt time.Time
	UpdatedAt time.Time
	DeletedAt *time.Time `sql:"index"`
}
type Folder struct {
	Model
	Name  string `json:"name"`
	Files []File `json:"files"`
}

type File struct {
	Model
	Name      string `json:"name"`
	Extension string `json:"extension"`
	Content   string `json:"content"`
	FolderID  uint   `json:"folderId"`
}

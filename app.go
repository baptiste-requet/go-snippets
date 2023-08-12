package main

import (
	"context"
	"fmt"
	"log"

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
	a.db, err = gorm.Open("sqlite3", "snippets.db")
	if err != nil {
		log.Fatal(err)
		return
	}

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

func (a *App) CreateFile(name, extension, content string, folderID uint) {
	file := File{Name: name, Extension: extension, Content: content, FolderID: folderID}
	a.db.Create(&file)
}

func (a *App) GetFile(id uint) File {
	var file File
	a.db.First(&file, id)
	return file
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

func (a *App) GetAllFolders() []Folder {
	var folders []Folder
	a.db.Find(&folders)
	return folders
}

type Folder struct {
	gorm.Model
	Name  string `json:"name"`
	Files []File `json:"files"`
}

type File struct {
	gorm.Model
	Name      string `json:"name"`
	Extension string `json:"extension"`
	Content   string `json:"content"`
	FolderID  uint   `json:"folderId"`
}
